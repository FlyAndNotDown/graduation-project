function result = dfrnt(source, a, m, p)
%dfrnt 1-D discrete fractional random transform
%
% - Description:
%       this function can do a 1-D discrete fractional random transform,
%       it input a 1xN size matrix, the order of transform, the cycle of
%       transform, a random matrix and return a 1xN size matrix
%
% - Arguments:
%       - source [1xN matrix] the source matrix with 1xN size
%       - a [float number] the order of transform
%       - m [integer] the cycle of transform
%       - p [NxN matrix] a random matrix, N is cols of source
% 
% - Returns:
%       - result [1xN matrix] the result matrix with 1xN size
%

% get size of source matrix
[~, sourceCols] = size(source);

% get the matrix 'q', q = (p + p') / 2
q = (p + p') / 2;

% get the eigenvector of 'q', named 'v'
v = eig(q)';
decodeEig = v;

% define the matrix 'd'
d = zeros(sourceCols, sourceCols);
for n = 1 : sourceCols
    d(n, n) = exp(-1i * 2 * pi * (n - 1) * a / m);
end

% caculate the kernel matrix 'r'
r = v * d * v';

% caculate the result
result = r * source;

end