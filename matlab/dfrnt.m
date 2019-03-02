function result = dfrnt(source, a, m, p)
%dfrnt - a 1d discrete fractional random transform
%
% - Description:
%       to do the discrete fractional random transform with a Nx1 matrix
%
% - Arguments:
%       - source [Nx1 matrix] the source signal
%       - a [double] the fractional order of transform
%       - m [integer] the cycle of transform
%       - p [NxN matrix] a random matrix 
%
% - Returns:
%       - result [Nx1 matrix] the output signal
%

% get the size info of source signal
[sourceRows, ~] = size(source);

% calculate the Q = (P + P') / 2
q = (p + p') / 2;

% get eig vectors matrix and orth it
[v, ~] = eig(q);
v = orth(v);

% get a special diag matrix
d = zeros(sourceRows, sourceRows);
for n = 1 : sourceRows
    d(n, n) = exp(-1i * 2 * pi * (n - 1) * a / m);
end

% get the kernal matrix
r = v * d * v';

% do transform
result = r * source;

end