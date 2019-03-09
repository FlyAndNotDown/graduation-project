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
result = source;

% do arnold transform to matrix
for n = 1 : s
    temp = zeros(sourceRow, sourceRow);
    for n1 = 1 : sourceRow
        for n2 = 1 : sourceRow
            temp(n1 + n2, n1 + 2 * n2) = result(n1, n2);
        end
    end
    result = temp;
end

end