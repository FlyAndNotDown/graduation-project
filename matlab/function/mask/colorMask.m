function mask = colorMask(source, s)
%colorMask - get color mask value of a image block
%
% - Arguments:
%       - source [nxnx3 matrix] source image block with CIELab color space after normalization
%       - s [double] a value has effect on transform
%
% - Returns:
%       - mask [double] color mask value of target block

% get size info
[sourceRow, sourceCol, ~] = size(source);

% for every pixel, calculate its color mask value and get sum
mask = 0;
for n1 = 1 : sourceRow
    for n2 = 1 : sourceCol
        channelA = source(n1, n2, 2);
        channelB = source(n1, n2, 3);
        mask = mask + 1 - exp(-(channelA ^ 2 + channelB ^ 2) / (s ^ 2));
    end
end

end