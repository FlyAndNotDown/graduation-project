source = [1, 2, 3, 4];
output = dfrft(source, 4, 0.5);
restored = dfrft(output, 4, -0.5);