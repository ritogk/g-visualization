<?php

namespace App\Libs\Model;

class TwitterCard
{
    private string $card;
    private string $domain;
    private string $title;
    private string $description;
    private string $image;

    /**
     * construct
     *
     * @param string $title
     * @param string $description
     * @param string $image
     */
    public function __construct(string $title, string $description, string $image)
    {
        $this->card = "summary";
        $this->domain = config('app.domain');
        $this->title = $title;
        $this->description = $description;
        $this->image = $image;
    }

    public function get_object()
    {
        return (object)[
            'card' => $this->card,
            'domain' => $this->domain,
            'title' => $this->title,
            'description' => $this->description,
            'image' => $this->image
        ];
    }
}
