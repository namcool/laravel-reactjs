<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Project;

class ProjectController extends Controller
{
    //
    public function index()
    {
        $projects = Project::where('is_completed', false)
                            ->orderBy('created_at', 'desc')
                            ->withCount(['tasks' => function ($query) {
                              $query->where('is_completed', false);
                            }])
                            ->get();

        return $projects->toJson();
    }

    public function store(Request $request)
    {
        // $validatedData = $request->validate([
        //     'name' => 'required',
        //     'description' => 'required'
        // ]);

        // $projects = Project::create([
        //     'name' => $validatedData['name'],
        //     'description' => $validatedData['description']
        // ]);

        $this->validate($request,
            [
                'name' => 'required',
                'description' => 'required'
            ],
            [
    			'name.required'=>'Chưa nhập tên project!',
    			'description.required'=>'Chưa nhập thông tin project.'
    		]
        );

        $project = new Project();
        $project->name = $request->name;
        $project->description = $request->description;
        $project->save();

        return response()->json('Project created!');
    }

    public function show($id)
    {
        $project = Project::with(['task' => function ($query){
            $query->where('is_completed',false);
        }])->find($id);

        return $project->toJson();
    }

    public function markAsCompleted(Project $project)
    {
        $project->is_complete = true;
        $project->update();

        return response()->json('Project updated');
    }

}
