#!/bin/bash
# ==============================================================================
# EMPEROR SAAS — AUTOMATED DATABASE & UPLOADS BACKUP SCRIPT
# ==============================================================================

set -e

BACKUP_DIR="/var/backups/emperor"
DATE=$(date +"%Y-%m-%d_%H-%M-%S")
DB_NAME="emperor_prod"
DB_USER="emperor_user"
DB_PASS="YOUR_STRONG_DATABASE_PASSWORD_HERE"

mkdir -p "$BACKUP_DIR"

echo "[$(date)] Starting Emperor Backup..."

# 1. Database Dump & Compression
mysqldump -u "$DB_USER" -p"$DB_PASS" "$DB_NAME" --single-transaction --quick | gzip > "$BACKUP_DIR/db_${DATE}.sql.gz"
echo "[$(date)] Database backup completed: db_${DATE}.sql.gz"

# 2. Uploads / Media Storage Backup
tar -czf "$BACKUP_DIR/storage_${DATE}.tar.gz" -C /var/www/emperor/storage/app/public .
echo "[$(date)] Storage backup completed: storage_${DATE}.tar.gz"

# 3. Retention: Delete backups older than 14 days
find "$BACKUP_DIR" -type f -name "*.gz" -mtime +14 -delete
echo "[$(date)] Old backups purged (14 days retention)."

echo "[$(date)] Backup process finished successfully."
