source = zeros(1, 4, 4);
source(:, :, 1) = [0, 0, 0, 0];
source(:, :, 2) = [1, 2, 3, 4];
source(:, :, 3) = [2, 3, 4, 5];
source(:, :, 4) = [3, 4, 5, 6];

p = rand(4, 4);
u = [0, 1, 0, 0];

output = rqdfrnt(source, 0.25, 1, p, u);
reSource = rqdfrnt(output, -0.25, 1, p, u);
output4 = rqdfrnt(output, 0.25, 1, p, u);
output4 = rqdfrnt(output4, 0.25, 1, p, u);
output4 = rqdfrnt(output4, 0.25, 1, p, u);