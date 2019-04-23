% init source matrix
source = zeros(4, 1, 4);
source(:, :, 1) = [0, 0, 0, 0]';
source(:, :, 2) = [1, 2, 3, 4]';
source(:, :, 3) = [2, 3, 4, 5]';
source(:, :, 4) = [3, 4, 5, 6]';

% get a random matrix
p = rand(4, 4);

% set a pure unit quaternion
u = [0, 1, 0, 0];

% calculate kernel matrix of QDFRNT
r = dfrntKernel(0.25, 1, p);
ir = dfrntKernel(-0.25, 1, p);

% matrix after one time QDFRNT
output = lqdfrnt(source, 4, r, u);

% matrix restored from output matrix
reSource = lqdfrnt(output, 4, ir, u);

% matrix after four time QDFRNT
output4 = lqdfrnt(output, 4, r, u);
output4 = lqdfrnt(output4, 4, r, u);
output4 = lqdfrnt(output4, 4, r, u);