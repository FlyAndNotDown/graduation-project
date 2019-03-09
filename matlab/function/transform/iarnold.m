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
for n1 = 1 : sourceRow
    for n2 = 1 : sourceRow
        x = n1;
        y = n2;
        for n = 1 : s
            x = mod(2 * (x - 1) - (y - 1), sourceRow) + 1;
            y = mod((y - 1) - (x - 1), sourceRow) + 1;
        end
        result(x, y) = source(n1, n2);;
    end
end

end