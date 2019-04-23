function output = dfrnt2(source, len, tKernel)
%dfrnt2 - two-dimension DFRNT
%
% - Description:
%       the two dimension discrete fractional random transform
%
% - Arguments:
%       - source [nxn double matrix] nxn source signal matrix
%       - len [int] length of source matrix
%       - tKernel [nxn double matrix] kernel matrix of transform
%
% - Returns:
%       - output [nxn double matrix] mxn output signal matrix

% % get size info
% [sourceRows, sourceCols] = size(source);

% init the output
output = source;

% do the DFRNT to every row
for n = 1 : len
    output(n, :) = dfrnt(output(n, :)', rr)';
end

% do the DFRNT to every col
for n = 1 : len
    output(:, n) = dfrnt(output(:, n), rc);
end

end