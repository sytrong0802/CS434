<?php

namespace App\Mail;

use App\Models\DanhGia;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class DanhGiaTinDangMail extends Mailable
{
    use Queueable, SerializesModels;

    public DanhGia $danhGia;

    /**
     * Create a new message instance.
     */
    public function __construct(DanhGia $danhGia)
    {
        $this->danhGia = $danhGia;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: "[HQC PhongTro] Khách hàng đánh giá tin đăng của bạn: {$this->danhGia->so_sao} sao!",
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.danhGiaTinDang',
            with: [
                'danhGia' => $this->danhGia,
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
