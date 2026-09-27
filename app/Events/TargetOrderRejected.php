<?php

namespace App\Events;

use App\Models\TargetSellOrder;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class TargetOrderRejected
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public function __construct(
        public TargetSellOrder $order,
        public string $reason = 'بيانات تحويل التارجت غير صحيحة'
    ) {}
}
