<?php

namespace App\Events;

use App\Models\DepositRequest;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class DepositRejected
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public function __construct(
        public DepositRequest $deposit
    ) {}
}
