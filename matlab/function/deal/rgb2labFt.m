function result = rgb2labFt(t)
%rgb2labFt - 'f(t)' function which will be used in 'rgb2lab'
%
% - Arguments:
%       - t [double] input value
%
% - Returns:
%       - result [double] output value

% init result
result = 0;

% calculate value
if t > (6 / 29) ^ 3
    result = t ^ (1 / 3);
else
    result = (1 / 3) * ((29 / 6) ^ 2) * t + 4 / 29;
end

end