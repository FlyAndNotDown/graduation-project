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
%       - blocks [mxnx3 matrix] bigger matrix

% get size info
[~, blocksLength] = size(blocks);
[blockRow, blockCol, blockHeight] = size(blocks{1, 1});

% calculate matrix size
blockPerCol = fix(blocksLength / blockPerRow);
matrixRow = blockRow * blockPerCol;
matrixCol = blockCol * blockPerRow;

% init sequence space and matrix space
matrix = zeros(matrixRow, matrixCol, blockHeight);

% copy
for n1 = 1 : blocksLength
    for n2 = 1 : blockRow
        for n3 = 1 : blockCol
            row = fix((n1 - 1) / blockPerRow) + 1;
            col = n1 - (row - 1) * blockPerRow;
            for n4 = 1 : blockHeight
                matrix((row - 1) * blockRow + n2, (col - 1) * blockCol + n3, n4) = blocks{1, n1}(n2, n3, n4);
            end
        end
    end
end