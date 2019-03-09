function result = arnold(source, s)
%arnold - do arnold transform with s times to a matrix
%
% - Description:
%       do arnold tarnsform twith s times to a matrix
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

% do arnold transform to matrix
for n1 = 1 : sourceRow
    for n2 = 1 : sourceRow
        x = n1;
        y = n2;
        for n = 1 : s
            x = mod((x - 1) + (y - 1), sourceRow) + 1;
            y = mod((x - 1) + 2 * (y - 1), sourceRow) + 1;
        end
        result(x, y) = source(n1, n2);
    end
end

end