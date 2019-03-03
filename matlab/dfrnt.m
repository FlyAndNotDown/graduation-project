function output = dfrnt(source, a, m, p)
%dfrnt - one-dimension DFRNT
%
% - Description:
%       the one dimension discrete fractional random transform
%
% - Arguments:
%       - source [1xn double matrix] 1xn source signal vector
%       - a [double] the fractional order of transform
%       - m [integer] the cycle of transform, must be mutiple of 'a'
%       - p [nxn double matrix] a nxn key matrix, the item can be number from 0 to 1
% - Returns:
%       - output [1xn double matrix] the output signal vector 

% do the transposition to source matrix
source = source';

% get size info of source matrix
[sourceRows, ~] = size(source);

% calculate the random symmetrical matrix
q = (p + p') / 2;

% get the random eigen matrix
[v, ~] = eig(q);
v = orth(v);

% get the special matrix 'd'
d = zeros(sourceRows, sourceRows);
for n = 1 : sourceRows
    d(n, n) = exp(-1i * 2 * pi * (n - 1) * a / m);
end

% get the kernal matrix of DFRNT
r = v * d * v';

% get the output matrix
output = r * source;
output = output';

end