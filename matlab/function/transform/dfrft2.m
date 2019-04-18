function output = dfrft2(source, rows, cols, a)
%dfrft2 - two-dimension DFRFT
%
% - Arguments:
%       - source [mxn double matrix] mxn source signal matrix
%       - rows [int] rows count
%       - cols [int] cols count
%       - a [double] fractional order

% init the output
output = source;

% do the DFRFT to every row
for n = 1 : rows
    output(n, :) = dfrft(output(n, :), cols, a)';
end

% do the DFRFT to every col
for n = 1 : cols
    output(:, n) = dfrft(output(:, n), rows, a);
end

end