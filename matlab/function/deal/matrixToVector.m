function output = matrixToVector(source)
%matrixToVector - change matrix to vector
%
% - Description:
%       change mxn matrix to 1x(mxn) vector
%
% - Arguments:
%       - source [mxn matrix] source matrix
%
% - Returns:
%       - output [1x(mxn) vector] output vector

% get size info
[sourceRow, sourceCol] = size(source);

% init output vector
output = zeros(1, sourceRow * sourceCol);

% copy
for n1 = 1 : sourceRow
    for n2 = 1 : sourceCol
        output(1, (n1 - 1) * sourceCol + n2) = source(n1, n2);
    end
end

end