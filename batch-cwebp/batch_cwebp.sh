#!/bin/bash

# Default directories
input_dir=""
output_dir=""
cwebp_flags=()

# Function to show usage of the script
show_usage() {
    echo "Usage: $0 -i <input_directory> -o <output_directory> <cwebp_flags>"
    echo
    echo "  -i <input_directory>   Path to the directory with input images."
    echo "  -o <output_directory>  Path to the directory to save output images."
    echo "  <cwebp_flags>          Any flags to pass to cwebp (without -f)."
    echo
    echo "Example:"
    echo "$0 -i /path/to/images -o /path/to/output -q 80 -lossless"
}

# Parse command-line arguments
while getopts ":i:o:" opt; do
  case $opt in
    i) input_dir="$OPTARG" ;;
    o) output_dir="$OPTARG" ;;
    \?) show_usage; exit 1 ;;
  esac
done

# Remove the processed options (-i and -o) from the argument list
shift $((OPTIND - 1))

# Capture all remaining arguments as flags for cwebp
cwebp_flags=("$@")

# Ensure input and output directories are provided
if [[ -z "$input_dir" ]] || [[ -z "$output_dir" ]]; then
    echo "Error: Both input and output directories must be specified."
    show_usage
    exit 1
fi

# Ensure input directory exists
if [[ ! -d "$input_dir" ]]; then
    echo "Error: Input directory '$input_dir' does not exist."
    exit 1
fi

# Ensure output directory exists, create if not
if [[ ! -d "$output_dir" ]]; then
    echo "Output directory '$output_dir' does not exist. Creating..."
    mkdir -p "$output_dir"
fi

# Loop through all files in the input directory
for img in "$input_dir"/*; do
    if [[ -f "$img" ]]; then
        # Extract file extension
        extension="${img##*.}"
        filename="${img##*/}"
        base="${filename%.*}"

        # Skip non-image files (if you want to be more specific, you can use mime types)
        if [[ ! "$extension" =~ ^(jpg|jpeg|png|bmp|tiff)$ ]]; then
            continue
        fi

        # Construct output file path
        output_file="$output_dir/$base.webp"

        # Perform the conversion using cwebp with the provided flags
        echo "Processing '$img' -> '$output_file'"
        cwebp "${cwebp_flags[@]}" "$img" -o "$output_file"
    fi
done

echo "Batch processing complete."
