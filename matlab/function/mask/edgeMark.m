function mask = edgeMask(source, l)
%edgeMask - get edge mask value of age image block
%
% - Arguments:
%       - source [nxnx3 matrix] source image block
%
% - Returns:
%       - mask [double] edge mask value of target block

% get size info
[sourceRow, sourceCol, ~] = size(source);

% get three channel's edge
edgeR = edge(source(:, :, 1));
edgeG = edge(source(:, :, 2));
edgeB = edge(source(:, :, 3));

% get sum
mask = 0;
for n1 = 1 : sourceRow
    for n2 = 1 : sourceCol
        mask = mask + edgeR(n1, n2) + edgeG(n1, n2) + edgeB(n1, n2);
    end
end

end