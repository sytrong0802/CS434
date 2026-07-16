<?php

namespace App\Mail;

use App\Models\TinDang;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class DuyetTinMail extends Mailable
{
    use Queueable, SerializesModels;

    public TinDang $tinDang;

    /**
     * Create a new message instance.
     */
    public function __construct(TinDang $tinDang)
    {
        $this->tinDang = $tinDang;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        $statusStr = $this->tinDang->trang_thai === 'HIEN_THI' ? 'Đã Được Duyệt' : 'Bị Từ Chối';
        return new Envelope(
            subject: "[HQC PhongTro] Kết quả duyệt tin đăng: {$statusStr} - \"{$this->tinDang->tieu_de}\"",
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.duyetTin',
            with: [
                'tinDang' => $this->tinDang,
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
