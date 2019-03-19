function result = rgb2labGamma(x)
%rgb2labGamma - 'gamma' function which will be used in 'rgb2lab'
%
% - Arguments:
%       - x [double{[0, 1]}] input value
%
% - Returns:
%       - result [double] output value

% init result
result = 0;

% calculate
if x > 0.04045
    result = ((x + 0.055) / 1.055) ^ 2.4;
else
    result = x / 12.92;
end

end