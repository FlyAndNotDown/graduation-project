source = zeros(1, 4, 4);
source(:, :, 1) = [0, 0, 0, 0];
source(:, :, 2) = [1, 2, 3, 4];
source(:, :, 3) = [2, 3, 4, 5];
source(:, :, 4) = [3, 4, 5, 6];

p = rand(4, 4);
u = [0, 1, 0, 0];

r = dfrntKernel(0.25, 1, p);
ir = dfrntKernel(-0.25, 1, p);

output = rqdfrnt(source, r, u);
reSource = rqdfrnt(output, ir, u);
output4 = rqdfrnt(output, r, u);
output4 = rqdfrnt(output4, r, u);
output4 = rqdfrnt(output4, r, u);