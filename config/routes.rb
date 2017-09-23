Rails.application.routes.draw do
  namespace :api do
    resources :projects do
      resources :sections do
        resources :pieces
      end
    end
  end
end
