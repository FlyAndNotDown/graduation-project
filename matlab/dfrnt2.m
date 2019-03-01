function result = dfrnt(source, a, m)
%dfrnt 2-D discrete fractional random transform
%
% - Description:
%       this function can do a 2-D discrete fractional random transform,
%       it input a MxN size matrix, the order of transform, the cycle of
%       transform and return a MxN size matrix
%
% - Arguments:
%       - source [MxN matrix] the source matrix with MxN size
%       - a [float number] the order of transform
%       - m [integer] the cycle of transform
%
% - Returns:
%       - result [MxN matrix] the result matrix with MxN size
%

% get size of source matrix
[~, sourceCols] = size(source);

% get a random matrix 'p'
p = rand(sourceCols, sourceCols);

end