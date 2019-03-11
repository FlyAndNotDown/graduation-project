function matrix = mergeBlock(blocks, blockPerRow)
%mergeBlock - merge blocks to matrix
%
% - Description:
%       - merge many smaller blocks to a bigger matrix
%
% - Arguments:
%       - blocks [1xn cell array {ixjx3 matrix}] blocks
%       - blockPerRow [integer] blocks number per row
%
% - Returns:
%       - blocks [mxn matrix] bigger matrix

% get size info
[~, blocksLength] = size(blocks);
[blockRow, blockCol] = size(blocks{1, 1});

% calculate matrix size
blockPerCol = blocksLength / blockPerRow;
matrixRow = blockRow * blockPerCol;
matrixCol = blockCol * blockPerRow;

% init sequence space and matrix space
matrix = zeros(matrixRow, matrixCol);

% copy
