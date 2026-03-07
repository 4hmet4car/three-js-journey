# `batch_cwebp.sh` - Batch Convert Images to WebP Format

This script allows you to batch convert images from a specified input directory to the WebP format using `cwebp`, with customizable flags for the conversion. The output images will be saved in a specified output directory.

## Features:

* Batch processes all images in a directory.
* Supports all flags available for `cwebp` (e.g., quality, lossless compression, resizing).
* Allows you to specify input and output directories.
* No need for a special flag for `cwebp` options—just pass them directly after the directories.

## Requirements:

* `cwebp` installed on your system. [Download `cwebp`](https://developers.google.com/speed/webp/download).

## Usage:

1. Make the script executable:

   ```bash
   chmod +x batch_cwebp.sh
   ```

2. Run the script:

   ```bash
   ./batch_cwebp.sh -i <input_directory> -o <output_directory> <cwebp_flags>
   ```

   * `-i <input_directory>`: The directory containing the input images.
   * `-o <output_directory>`: The directory where the WebP images will be saved.
   * `<cwebp_flags>`: Any flags you want to pass to `cwebp` (e.g., `-q 80 -lossless`).

### Example:

Convert all images in `/home/user/images` to WebP format with quality `80` and lossless compression, saving them in `/home/user/output`:

```bash
./batch_cwebp.sh -i /home/user/images -o /home/user/output -q 80 -lossless
```

### Supported Flags:

* `-q <quality>`: Set the quality of the WebP image (0–100).
* `-lossless`: Enable lossless compression.
* `-resize <width> <height>`: Resize the image before conversion.
* `-alpha_q <quality>`: Set the quality of the alpha (transparency) channel.
* And more! Check `cwebp`'s [documentation](https://developers.google.com/speed/webp/docs/cwebp) for a full list of available flags.

## Notes:

* The script supports most common image formats like JPEG, PNG, BMP, and TIFF.
* Non-image files in the input directory will be ignored.

## License:

MIT License (feel free to modify and distribute)