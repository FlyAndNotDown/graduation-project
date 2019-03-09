function blocks = splitBlock(source, blockLength)
%splitBlocks - split image to many blocks
%
% - Description:
%       - split image to many smaller blocks
%
% - Arguments:
%       - source [mxnx3 matrix] source image matrix
%       - blockLength [integer] smaller block length, must be factor of n and m
%
% - Returns:
%       - blocks [ixjx3 matrix cell array] smaller blocks

% get size info
[sourceRow, sourceCol, ~] = size(source);

% calculate smaller block nums
blockNumPerRow = fix(sourceCol / blockLength);
blockNumPerCol = fix(sourceRow / blockLength);

% generate a new cell array
blocks = cell(1, blockNumPerRow * blockNumPerCol);

% copy
for n1 = 1 : blockNumPerCol
    for n2 = 1 : blockNumPerRow
        blocks{1, blockNumPerRow * (n1 - 1) + n2} = zeros(blockLength, blockLength, 3);
        for n3 = 1 : blockLength
            for n4 = 1 : blockLength
                for n5 = 1 : 3
                    blocks{1, blockNumPerRow * (n1 - 1) + n2}(n3, n4, n5) = source((n1 - 1) * blockLength + n3, (n2 - 1) * blockLength + n4, n5);
                end
            end
        end
    end
end

end