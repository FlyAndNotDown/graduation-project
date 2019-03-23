function mask = colorMask(source, sigma)
%colorMask - get color mask value of a image block
%
% - Arguments:
%       - source [nxnx3 matrix] source image block
%       - l [integer] window length
%
% - Returns:
%       - mask [double] color mask value of target block

% get size info
[sourceRow, ~, ~] = size(source);

% change color space from RGB to CIELab
sourceLab = rgb2lab(source);

% TODO

end