% init source matrix
source = [1, 2, 3, 4];

% output
output = dfrft(source, 4, 0.5);
restored = dfrft(output, 4, -0.5);