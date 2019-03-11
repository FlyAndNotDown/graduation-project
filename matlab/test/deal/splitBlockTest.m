% init source matrix
source = zeros(4, 6, 3);
source(1, :, :) = [1, 22, 3; 25, 3, 4; 3, 4, 45; 4, 55, 6; 5, 6, 7; 6, 7, 8];
source(2, :, :) = [2, 63, 4; 53, 4, 25; 4, 5, 26; 75, 6, 7; 6, 7, 68; 8, 49, 10];
source(3, :, :) = [13, 14, 5; 4, 5, 6; 5, 6, 7; 46, 97, 28; 7, 8, 9; 9, 10, 11];
source(4, :, :) = [4, 75, 6; 25, 6, 7; 36, 7, 8; 7, 28, 9; 9, 810, 11; 910, 11, 12];

% split blocks
blocks = splitBlock(source, 2);

% restore
output = mergeBlock(blocks, 3);