function result = iarnold(source, s)
%iarnold - do inverse arnold transform to a matrix
%
% - Description:
%       do inverse arnold transform to a matrix
%
% - Arguments:
%       - source [nxn matrix] source matrix
%       - s [integer] transform times
%
% - Returns:
%       - result [nxn matrix] result matrix

% get size info
[sourceRow, ~] = size(source);

% init result
result = zeros(sourceRow, sourceRow);

% do inverse arnold transform to matrix
for n = 1 : s
    for n1 = 1 : sourceRow
        for n2 = 1 : sourceRow
            x = mod(2 * (n1 - 1) - (n2 - 1), sourceRow) + 1;
            y = mod((n2 - 1) - (n1 - 1), sourceRow) + 1;
            result(y, x) = source(n2, n1);
        end
    end
    source = result;
end

end