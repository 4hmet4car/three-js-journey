float remap(float value, float originMin, float originMax, float destinationMin, float destinationMax)
{
    return destinationMin + (value - originMin) * (destinationMax - destinationMin) / (originMax - originMin);
}

float clampedRemap(float value, float originMin, float originMax, float destinationMin, float destinationMax)
{
    float remappedValue = destinationMin + (value - originMin) * (destinationMax - destinationMin) / (originMax - originMin);
    return clamp(remappedValue, destinationMin, destinationMax);
}