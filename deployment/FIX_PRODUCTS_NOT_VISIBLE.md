# Fix missing Vite manifest and products not visible

Run these commands from the deployed Laravel project root on the production server:

```bash
# Restore the deployed code, including the product catalog fixes.
git pull --ff-only origin main

# Build and verify the frontend manifest and assets on the server.
npm ci
npm run build
test -s public/build/manifest.json

# Clear Laravel's cached views/config/routes and product catalog responses.
php artisan optimize:clear

# Confirm every asset referenced by the Vite manifest exists.
php -r '$m=json_decode(file_get_contents("public/build/manifest.json"),true,512,JSON_THROW_ON_ERROR); foreach($m as $e){if(!file_exists("public/build/".$e["file"])) {fwrite(STDERR,"Missing: ".$e["file"].PHP_EOL); exit(1);} foreach($e["css"]??[] as $f){if(!file_exists("public/build/".$f)){fwrite(STDERR,"Missing: ".$f.PHP_EOL);exit(1);}}} echo "Manifest assets OK".PHP_EOL;'
```

If the server does not have Node.js/npm, build `public/build` in CI or on the release machine and upload the **entire** `public/build` directory, including `manifest.json` and all referenced files, to the deployed project's `public/build`. Do not upload the manifest alone.

The current catalog fix includes:

- Product category pages include active child products instead of filtering all `parent_id` products out.
- Product list cache keys are versioned so old cached query results are not reused.
- Product save, activation, deletion, and catalog sync clear Laravel's cache.

After deployment, check `/api/v1/products?category_slug=apps-recharge` (or the actual category slug shown in Admin) and confirm the newly-added product is in the `data` array. The product must be active and assigned to the category being opened.
