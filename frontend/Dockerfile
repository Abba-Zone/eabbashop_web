# 1. Base image: Nginx
FROM nginx:alpine

# 2. Set working directory for Nginx
WORKDIR /usr/share/nginx/html

# 3. Copy the build output from Jenkins (already built)
COPY build/ .

# 4. Copy the custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 5. Expose port 3000
EXPOSE 3000

# 6. Start Nginx
CMD ["nginx", "-g", "daemon off;"]