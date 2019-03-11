% init source
blocks = cell(1, 6);
blocks{1, 1} = [1, 2, 3; 4, 5, 6];
blocks{1, 2} = [2, 3, 4; 5, 6, 7];
blocks{1, 3} = [3, 4, 5; 6, 7, 8];
blocks{1, 4} = [4, 5, 6; 7, 8, 9];
blocks{1, 5} = [5, 6, 7; 8, 9, 10];
blocks{1, 6} = [6, 7, 8; 9, 10, 11];

% do it
matrix = mergeBlock(blocks, 3);