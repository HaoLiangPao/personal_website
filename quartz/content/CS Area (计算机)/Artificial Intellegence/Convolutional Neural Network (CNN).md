---
title: Deep Learning
tags:
  - CS
draft: "false"
---
## Definition 




## Comparison between common models

Excellent questions! Let me clarify the channel mechanics and provide a comprehensive comparison table.

## Channel Mechanics in CNNs

### How Channels Work

```python
# Input: (batch_size, channels, height, width)
# CIFAR-10: (B, 3, 32, 32) - 3 RGB channels
# Conv layer: (in_channels, out_channels, kernel_height, kernel_width)
conv1 = nn.Conv2d(3, 32, kernel_size=3)  # 3 input channels, 32 output channels
# Each output channel is computed as:
# output_channel[i] = Σ(input_channels * kernel[i])
```


### Step-by-Step Channel Evolution

```python
# Input image
x = torch.randn(4, 3, 32, 32)  # (B=4, C=3, H=32, W=32)

# After Conv1: 3 -> 32 channels
conv1 = nn.Conv2d(3, 32, kernel_size=3, padding=1)
x = conv1(x)  # (B=4, C=32, H=32, W=32)

# After Conv2: 32 -> 64 channels  
conv2 = nn.Conv2d(32, 64, kernel_size=3, padding=1)
x = conv2(x)  # (B=4, C=64, H=32, W=32)

# After Conv3: 64 -> 128 channels
conv3 = nn.Conv2d(64, 128, kernel_size=3, padding=1)
x = conv3(x)  # (B=4, C=128, H=32, W=32)
```
### What Each Channel Represents

```python
# Channel 0 might detect: horizontal edges
# Channel 1 might detect: vertical edges  
# Channel 2 might detect: diagonal edges
# Channel 3 might detect: corners
# ... and so on for all 32 channels

# Each channel is a "feature map" - it highlights specific patterns
```

## Max Pooling Strategy

### Do You Need Max Pooling After Every Conv?

No! Here are the common strategies:

```python
# Strategy 1: Pool after every conv (aggressive)
Conv -> MaxPool -> Conv -> MaxPool -> Conv -> MaxPool -> FC

# Strategy 2: Pool after every 2 convs (moderate)  
Conv -> Conv -> MaxPool -> Conv -> Conv -> MaxPool -> FC

# Strategy 3: Pool only once (preserves spatial info)
Conv -> Conv -> Conv -> MaxPool -> FC

# Strategy 4: No pooling (modern approach)
Conv -> Conv -> Conv -> GlobalAvgPool -> FC
```
### Trade-offs:

| Strategy              | Pros                           | Cons                             |
| --------------------- | ------------------------------ | -------------------------------- |
| Pool after every conv | Fast computation, small memory | Loses spatial details quickly    |
| Pool after 2 convs    | Balanced approach              | Moderate spatial loss            |
| Pool once             | Preserves spatial info         | More computation, larger memory  |
| No pooling            | Maximum spatial info           | Most computation, largest memory |

## Comprehensive Architecture Comparison Table

| Architecture    | Year | Depth      | Key Innovation      | Pros                            | Cons             | Parameters |
| --------------- | ---- | ---------- | ------------------- | ------------------------------- | ---------------- | ---------- |
| LeNet-5         | 1998 | 7 layers   | First CNN           | Simple, fast                    | Limited capacity | ~60K       |
| AlexNet         | 2012 | 8 layers   | ReLU, Dropout       | Good performance                | Large, overfits  | ~60M       |
| VGG-16          | 2014 | 16 layers  | Small kernels (3x3) | Simple design, good features    | Very large, slow | ~138M      |
| ResNet-18       | 2015 | 18 layers  | Skip connections    | Easy to train, good performance | More complex     | ~11M       |
| DenseNet-121    | 2017 | 121 layers | Dense connections   | Feature reuse, efficient        | Memory intensive | ~8M        |
| EfficientNet-B0 | 2019 | 237 layers | Compound scaling    | Very efficient                  | Complex design   | ~5M        |

### Detailed Comparison:

#### LeNet-5 (1998)

```python
# Architecture: Conv -> Pool -> Conv -> Pool -> FC -> FC
```

Pros:
- Simple and interpretable
- Fast inference
- Good for simple tasks (digit recognition)

Cons:
- Limited capacity for complex images
- No modern techniques (ReLU, dropout)
- Poor performance on complex datasets

#### AlexNet (2012)

```python
# Architecture: 5 Conv + 3 FC layers
```

Pros:
- First to show deep learning works
- Introduced ReLU and dropout
- Good performance on ImageNet

Cons:
- Very large (60M parameters)
- Overfits easily
- Computationally expensive

#### VGG-16 (2014)

```python
# Architecture: 13 Conv + 3 FC layers, all 3x3 kernels
```

Pros:
- Simple, uniform design
- Excellent feature extractor
- Good for transfer learning

Cons:
- Huge (138M parameters)
- Very slow training/inference
- Memory intensive

#### ResNet-18 (2015)

```python
# Architecture: 18 layers with skip connections
```

Pros:
- Easy to train (no vanishing gradients)
- Good performance
- Efficient (11M parameters)

Cons:
- More complex design
- Skip connections add complexity

#### DenseNet-121 (2017)

```python
# Architecture: Dense connections between all layers
```

Pros:
- Excellent feature reuse
- Very efficient (8M parameters)
- Good performance

Cons:
- Memory intensive during training
- Complex implementation

#### EfficientNet-B0 (2019)

```python
# Architecture: Compound scaling of depth, width, resolution
```

Pros:
- Very efficient (5M parameters)
- Excellent performance/size ratio
- Modern design

Cons:
- Complex compound scaling
- Harder to understand

## Kernel Size Comparison

| Kernel Size | Receptive Field | Parameters | Pros                 | Cons                    |
| ----------- | --------------- | ---------- | -------------------- | ----------------------- |
| 1x1         | 1x1             | Very few   | Cheap, non-linearity | No spatial info         |
| 3x3         | 3x3             | Moderate   | Good balance         | Limited receptive field |
| 5x5         | 5x5             | More       | Larger patterns      | More parameters         |
| 7x7         | 7x7             | Many       | Large patterns       | Expensive               |
| 11x11       | 11x11           | Very many  | Very large patterns  | Very expensive          |
