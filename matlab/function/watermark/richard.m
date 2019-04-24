function output = richard(keys, t)
%richard - richard logical curve

% get params
key1 = keys(1, 1 : 6);
key2 = keys(1, 7 : 12);
key3 = keys(1, 13 : 18);
if t <= 1.5
    key = key1;
elseif t > 3.5
    key = key3;
else
    key = key2;
end
a = key(1, 1);
b = key(1, 2);
k = key(1, 3);
q = key(1, 4);
m = key(1, 5);
v = key(1, 6);

% calculate
output = a + (k - a) / ((1 + q * exp(0 - b * (t - m))) ^ (1 / v));
output = real(output);

end