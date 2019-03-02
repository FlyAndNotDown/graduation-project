function r = dfrntKernal(a, m, p)

[pRows, ~] = size(p);

q = (p + p') / 2;

[v, ~] = eig(q);
v = orth(v);

d = zeros(pRows, pRows);
for n = 1 : pRows
    d(n, n) = exp(-1i * 2 * pi * (n - 1) * a / m);
end
    
r = v * d * v';

end