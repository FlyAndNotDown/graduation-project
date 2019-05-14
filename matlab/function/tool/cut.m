function output = cut(source, percent)
%cut - cut some part of image
%
% - Arguments:
%       - source [mxn matrix | mxnx3 matrix] source image, can be grayscale image of color image
%
% - Returns:
%       - output [?x? matrix] output image after cut

% get size info
[sourceRows, sourceCols, sourceChannels] = size(source);

% get cut length
cutLength = floor(sourceCols * percent);

% do cut
output = source;
output(:, sourceCols - cutLength + 1 : sourceRows, :) = 0;

end