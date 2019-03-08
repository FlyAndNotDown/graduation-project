function output = dfrntKernel(a, m, p)
%dfrntKernel - get kernel of DFRNT
%
% - Description:
%       get kernel of discrete fractional random transform
%
% - Arguments:
%       - a [double] the fractional order of transform
%       - m [integer] the cycle of transform, must be mutiple of 'a'
%       - p [nxn double matrix] a nxn key matrix, the item can be number from 0 to 1

% get size info
[pRows, ~] = size(p);

% calculate the random symmetrical matrix
q = (p + p') / 2;

% get the random eigen matrix
[v, ~] = eig(q);
v = orth(v);

% get the special matrix 'd'
d = zeros(pRows, pRows);
for n = 1 : pRows
    d(n, n) = exp(-1i * 2 * pi * (n - 1) * a / m);
end

% get the kernel matrix of DFRNT
output = v * d * v';

end