source = [1, 2, 3, 4];
output = dfrftSample(source, 4, 0.5);
restored = dfrftSample(output, 4, -0.5);