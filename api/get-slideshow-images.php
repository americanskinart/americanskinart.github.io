<?php
// api/get-slideshow-images.php - Dynamically scan slideshow folders and return image paths

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$artistsPath = __DIR__ . '/../images/artists';
$slideshowImages = [];

// Artist configuration with their page URLs
$artists = [
    'sinisterblack_tattoos' => [
        'handle' => '@sinisterblack_tattoos',
        'page' => 'artists/sinisterblack_tattoos.html'
    ],
    'dannypeltier.ink' => [
        'handle' => '@dannypeltier.ink',
        'page' => 'artists/dannypeltier.ink.html'
    ],
    'cruelbloomtattoo' => [
        'handle' => '@cruelbloomtattoo',
        'page' => 'artists/cruelbloomtattoo.html'
    ]
];

// Scan each artist's slideshow folder
foreach ($artists as $artistKey => $artistInfo) {
    $slideshowPath = $artistsPath . '/' . $artistKey . '/slideshow';

    if (is_dir($slideshowPath)) {
        $files = scandir($slideshowPath);

        foreach ($files as $file) {
            // Only include image files
            $ext = strtolower(pathinfo($file, PATHINFO_EXTENSION));
            if (in_array($ext, ['jpg', 'jpeg', 'png', 'gif', 'webp'])) {
                // Create relative path from web root
                $relativePath = 'images/artists/' . $artistKey . '/slideshow/' . $file;

                $slideshowImages[] = [
                    'src' => $relativePath,
                    'alt' => $artistInfo['handle'],
                    'href' => $artistInfo['page'],
                    'username' => $artistInfo['handle'],
                    'artist' => $artistKey
                ];
            }
        }
    }
}

// Shuffle the array for random order
shuffle($slideshowImages);

echo json_encode($slideshowImages, JSON_PRETTY_PRINT);
