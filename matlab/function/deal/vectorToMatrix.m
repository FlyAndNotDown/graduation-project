function output = vectorToMatrix(source, numPerRow)
%vectorToMatrix - change vector to matrix
%
% - Arguments:
%       - source [1xn vector] source vector
%       - numPerRow [integer] num per row
%
% - Returns:
%       - output [ixj matrix] output matrix

% get size info
[~, vectorLength] = size(source);

% init output vector
output = zeros(floor(vectorLength / numPerRow), numPerRow);

% copy
for n1 = 1 : floor(vectorLength / numPerRow)
    for n2 = 1 : numPerRow
        output(n1, n2) = source(1, (n1 - 1) * numPerRow + n2);
    end
end

end