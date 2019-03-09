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
for n = 1 : s
    for n1 = 1 : sourceRow
        for n2 = 1 : sourceRow
            x = mod((n1 - 1) + (n2 - 1), sourceRow) + 1;
            y = mod((n1 - 1) + 2 * (n2 - 1), sourceRow) + 1;
            result(y, x) = source(n2, n1);
        end
    end
    source = result;
end

end