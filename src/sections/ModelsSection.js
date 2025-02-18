import { ModelViewer } from '../components/ModelViewer';

export const ModelsSection = () => {
    return (
        <section id="models" className="min-h-screen bg-purple-light dark:bg-purple-dark text-purple-dark dark:text-purple-light max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <h1 className="text-3xl font-bold mb-12 text-center">3D Models</h1>
            <div className="w-full h-[600px]">
                <ModelViewer />
            </div>
        </section>
    );
};
