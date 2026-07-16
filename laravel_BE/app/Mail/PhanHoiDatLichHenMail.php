<?php

namespace App\Mail;

use App\Models\LichHenXemPhong;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class PhanHoiDatLichHenMail extends Mailable
{
    use Queueable, SerializesModels;

    public LichHenXemPhong $lichHen;

    /**
     * Create a new message instance.
     */
    public function __construct(LichHenXemPhong $lichHen)
    {
        $this->lichHen = $lichHen;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Phản hồi lịch hẹn xem phòng - Hệ thống PhongTro HQC',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.phanHoiDatLichHen',
            with: [
                'lichHen' => $this->lichHen,
            ]
        );
    }

    /**
     * Get the attachments for the message.
     */
    public function attachments(): array
    {
        return [];
    }
}
