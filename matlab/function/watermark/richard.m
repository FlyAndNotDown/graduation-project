function output = richard(a, b, k, q, m, v, t)
%richard - richard logical curve

% calculate
output = a + (k - a) / ((1 + q * exp(0 - b * (t - m))) ^ (1 / v));

end