function output = dfrnt2(source, rows, cols, rr, rc)
%dfrnt2 - two-dimension DFRNT
%
% - Description:
%       the two dimension discrete fractional random transform
%
% - Arguments:
%       - source [mxn double matrix] mxn source signal matrix
%       - rr [nxn double matrix] a kernel matrix, it will be used when doing DFRNT to every row
%       - pc [mxm double matrix] a kernel matrix, it will be used when doing DFRNT to every col
%       - rows [int] rows count
%       - cols [int] cols count
%
% - Returns:
%       - output [mxn double matrix] mxn output signal matrix

% % get size info
% [sourceRows, sourceCols] = size(source);

% init the output
output = source;

% do the DFRNT to every row
for n = 1 : rows
    output(n, :) = dfrnt(output(n, :)', rr)';
end

% do the DFRNT to eveny col
for n = 1 : cols
    output(:, n) = dfrnt(output(:, n), rc);
end

end