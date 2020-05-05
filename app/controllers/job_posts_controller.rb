class JobPostsController < ApplicationController
    def new 
        @job_post = JobPost.new 
    end
    def create
        @job_post = JobPost.new job_post_params
        if @job_post.save
            redirect_to job_post_path(@job_post)
        else 
            render :new 
        end
    end

    private 
    
    def job_post_params
        params.require(:job_post).permit(:title, :description, :min_salary, :max_salary, :company_name, :location)
    end
end
