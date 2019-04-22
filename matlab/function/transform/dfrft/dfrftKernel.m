function tKernel = dfrftKernel(nth, a)
%dfrftKernel - get kernel matrix of DFrFT
%
% - Arguments:
%       - nth [int] length of kernel matrix
%       - a [double] fractional order

% even status
even = ~rem(nth, 2);
shift = rem((0 : nth - 1) + fix(nth / 2), nth) + 1;

% get hermite sample matrix
% if even
%     x = (-fix(nth / 2) : fix(nth / 2) - 1);
% else
%     x = (-fix(nth / 2) : fix(nth / 2));
% end
xf = (- nth / 2 : (nth / 2) - 1)' / sqrt(nth / (2 * pi));
ef = exp(-xf .^ 2 / 2);
u(:, 1) = ef;
m1 = norm(u(:, 1));
u(:, 1) = u(:, 1) / m1;
u(:, 2) = 2 * xf .* ef;
m2 = norm(u(:, 2));
u(:, 2) = u(:, 2) / m2;
m1 = m2 / m1;
for n = 3 : nth + 1
    u(:, n) = 2 * m1 * xf .* u(:, n - 1) - 2 * (n - 2) * u(:, n - 2);
    m2 = norm(u(:, n));
    u(:, n) = u(:, n) / m2;
    m1 = m2 / m1;
end
if even
    u(:, nth) = [];
else
    u(:, nth + 1) = [];
end
u(shift, :) = u;

% get DFT eigenvectors
s = diag(2 * cos((0 : nth - 1) * 2 * pi / nth)) + diag(ones(1, nth - 1), 1) + diag(ones(1, nth - 1), -1);
s(1, nth) = 1;
s(nth, 1) = 1;
[evs, ~] = eig(s);
% evs = orth(evs);

% do project from hermite space to DFT space
for n = 1 : 4
    if even
        % switch n
        %     case {1, 3}
        %         ind = n : 4 : nth + 1;
        %         if (rem(nth, 4) ~= 0 && n == 3) || (rem(nth, 4) == 0 && n == 1)
        %             ind(end) = ind(end) - 1;
        %         end
        %     case {2, 4}
        %         ind = n : 4 : nth - 1;
        % end
        ind = n : 4 : nth;
    else
        ind = n : 4 : nth;
    end
    uOrth = orth(evs(:, ind) * evs(:, ind)' * u(:, ind));
    dis = length(ind) - size(uOrth, 2);
    uOrth = [uOrth zeros(size(u, 1), dis)];
    % uOrth = [uOrth repmat(uOrth(:, 1), dis)];
    u(:, ind) = uOrth;
end

% get matrix d
d = exp(-1i * a * (0 : nth));
if even
    d(:, nth) = [];
else
    d(:, nth + 1) = [];
end
d = diag(d);

% get kernel matrix
tKernel = u * d * u';

end
