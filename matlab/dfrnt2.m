function output = dfrnt2(source, a, m, pr, pc)
%dfrnt2 - two-dimension DFRNT
%
% - Description:
%       the two dimension discrete fractional random transform
%
% - Arguments:
%       - source [mxn double matrix] mxn source signal vector
%       - a [double] the fractional order of transform
%       - m [integer] the cycle of transform, must be mutiple of 'a'
%       - pr [nxn double matrix] a mxm key matrix, it will use when row 1-d DFRNT, the item can be number from 0 to 1
%       - pc [mxm double matrix] a nxn key matrix, it will use when col 1-d DFRNT, the item can be number from 0 to 1

% init the output
output = source;

% get size info of source matrix
[sourceRows, sourceCols] = size(source);

% caculate the two kernel matrix of DFRNT, this is row DFRNT kernal
q = (pr + pr') / 2;
[v, ~] = eig(q);
v = orth(v);
d = zeros(sourceCols, sourceCols);
for n = 1 : sourceCols
    d(n, n) = exp(-1i * 2 * pi * (n - 1) * a / m);
end
rr = v * d * v';

% and another, col DFRNT kernal
q = (pc + pc') / 2;
[v, ~] = eig(q);
v = orth(v);
d = zeros(sourceCols, sourceCols);
for n = 1 : sourceCols
    d(n, n) = exp(-1i * 2 * pi * (n - 1) * a / m);
end
rc = v * d * v';

% do the DFRNT to every row
for n = 1 : sourceRows
    output(n,:) = (rr * output(n,:)')';
end

% do the DFRNT to event col
for n = 1 : sourceCols
    output(:,n) = rc * output(:,n);
end

end